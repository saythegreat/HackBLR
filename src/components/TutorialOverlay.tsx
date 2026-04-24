// TutorialOverlay removed — returns null so it can never render
export default function TutorialOverlay({ onClose }: { onClose: () => void }) {
  // Auto-dismiss immediately so nothing blocks the UI
  if (typeof window !== 'undefined') onClose();
  return null;
}
