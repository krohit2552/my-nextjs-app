import Link from 'next/link';

const ReviewCard = ({ review }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold">{review.product.title}</h3>
      <p className="text-sm text-gray-600">{review.changes.description}</p>
      <div className="flex justify-end space-x-4 mt-2">
        <Link href={`/pending-requests/${review._id}?action=approve`}>
          <a className="text-green-600">Approve</a>
        </Link>
        <Link href={`/pending-requests/${review._id}?action=reject`}>
          <a className="text-red-600">Reject</a>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
