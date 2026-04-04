'use client'

interface DeleteConfirmDialogProps {
  recipeName: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmDialog({ recipeName, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center px-4 pb-8">
      <div className="bg-bg-tertiary border border-border-secondary rounded-2xl w-full max-w-sm p-5 space-y-4">
        <div className="text-center">
          <div className="text-2xl mb-2">🗑️</div>
          <h3 className="font-display font-semibold text-text-primary text-lg">Delete recipe?</h3>
          <p className="text-text-secondary text-sm mt-1">
            &ldquo;{recipeName}&rdquo; will be permanently deleted.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-border-secondary text-text-secondary text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-700 text-white text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
