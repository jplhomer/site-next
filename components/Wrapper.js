import { mergeClasses } from '@/lib/utils';

export default function Wrapper({ children, className }) {
  return <div className={mergeClasses('max-w-4xl mx-auto p-4', className)}>{children}</div>;
}
