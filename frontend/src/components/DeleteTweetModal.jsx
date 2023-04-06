export default function DeleteTweetModal({ showModal, onDelete, onClose }) {
  return (
    <div
      className={`${
        showModal ? "" : "hidden"
      } fixed inset-0 flex items-center justify-center z-50`}
    >
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg z-50">
        <div className="px-8 py-6">
          Are you sure you want to delete this tweet?
        </div>
        <div className="px-4 pb-4 flex justify-end gap-2">
          <button
            className="px-2 py-1 bg-white border-2 rounded-md mr-2"
            onClick={onClose}
          >
            Go back
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded-md"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
