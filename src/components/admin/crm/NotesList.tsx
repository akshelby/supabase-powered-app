import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CrmNote } from '@/types/database';
import { format } from 'date-fns';
import { StickyNote } from 'lucide-react';

interface NotesListProps {
  leadId?: string;
  userId?: string;
  refreshKey?: number;
}

export function NotesList({ leadId, userId, refreshKey }: NotesListProps) {
  const [notes, setNotes] = useState<CrmNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, [leadId, userId, refreshKey]);

  const fetchNotes = async () => {
    try {
      let query = supabase.from('crm_notes' as any).select('*').order('created_at', { ascending: false });
      if (leadId) query = query.eq('lead_id', leadId);
      if (userId) query = query.eq('user_id', userId);

      const { data, error } = await query;
      if (error) throw error;
      setNotes((data as any) || []);
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-center text-muted-foreground">
        <StickyNote className="h-8 w-8" />
        <p className="text-sm">No notes yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((n) => (
        <div key={n.id} className="rounded-lg border bg-muted/30 p-3">
          <p className="text-sm whitespace-pre-wrap">{n.note}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {format(new Date(n.created_at), 'MMM d, yyyy h:mm a')}
          </p>
        </div>
      ))}
    </div>
  );
}
