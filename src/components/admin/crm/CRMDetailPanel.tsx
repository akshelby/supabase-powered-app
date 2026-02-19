import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NoteForm } from './NoteForm';
import { NotesList } from './NotesList';
import { FollowupForm } from './FollowupForm';
import { FollowupList } from './FollowupList';
import { ActivityTimeline } from './ActivityTimeline';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Building2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DetailInfo {
  name: string;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  company?: string | null;
  status?: string;
  source?: string | null;
}

interface CRMDetailPanelProps {
  leadId?: string;
  userId?: string;
  info: DetailInfo;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  contacted: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  interested: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  quoted: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  converted: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  lost: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export function CRMDetailPanel({ leadId, userId, info, onClose }: CRMDetailPanelProps) {
  const [notesRefresh, setNotesRefresh] = useState(0);
  const [followupsRefresh, setFollowupsRefresh] = useState(0);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between border-b p-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold truncate">{info.name}</h3>
            {info.status && (
              <Badge className={`text-xs ${statusColors[info.status] || ''}`}>
                {info.status}
              </Badge>
            )}
          </div>
          <div className="mt-2 space-y-1">
            {info.phone && (
              <a href={`tel:${info.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Phone className="h-3.5 w-3.5" />
                {info.phone}
              </a>
            )}
            {info.email && (
              <a href={`mailto:${info.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Mail className="h-3.5 w-3.5" />
                {info.email}
              </a>
            )}
            {info.city && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {info.city}
              </p>
            )}
            {info.company && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                {info.company}
              </p>
            )}
            {info.source && (
              <p className="text-xs text-muted-foreground">Source: {info.source}</p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="notes" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="mx-4 mt-3 grid w-auto grid-cols-3">
          <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
          <TabsTrigger value="followups" className="text-xs">Follow-ups</TabsTrigger>
          <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="notes" className="mt-0 space-y-4">
            <NoteForm
              leadId={leadId}
              userId={userId}
              onNoteAdded={() => setNotesRefresh((p) => p + 1)}
            />
            <NotesList leadId={leadId} userId={userId} refreshKey={notesRefresh} />
          </TabsContent>

          <TabsContent value="followups" className="mt-0 space-y-4">
            <FollowupForm
              leadId={leadId}
              userId={userId}
              onFollowupAdded={() => setFollowupsRefresh((p) => p + 1)}
            />
            <FollowupList leadId={leadId} userId={userId} refreshKey={followupsRefresh} showAll />
          </TabsContent>

          <TabsContent value="activity" className="mt-0">
            <ActivityTimeline
              userId={userId}
              leadId={leadId}
              refreshKey={notesRefresh + followupsRefresh}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
