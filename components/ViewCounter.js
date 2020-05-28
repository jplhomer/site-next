import { mergeClasses } from '@/lib/utils';

export default function ViewCounter({ id, className, shouldIncrement = false }) {
  // TODO: Pull real views
  const views = 1000;

  return (
    <span className={mergeClasses('text-gray-600 text-sm', className)}>{Number(views).toLocaleString()} views</span>
  );
}
