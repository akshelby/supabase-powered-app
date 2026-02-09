import { MessageCircle } from "lucide-react";

interface ChatEmptyStateProps {
  refId: string;
}

export function ChatEmptyState({ refId }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-[#E60000]/10 flex items-center justify-center">
        <MessageCircle className="w-8 h-8 text-[#E60000]" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-[#1A1A1A]">No messages yet</h3>
        <p className="text-sm text-muted-foreground max-w-[280px]">
          Send a message or photo to start your support request. Your reference ID is{" "}
          <span className="font-mono font-semibold text-[#E60000]">{refId}</span>.
        </p>
      </div>
    </div>
  );
}
