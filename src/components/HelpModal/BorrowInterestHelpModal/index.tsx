import { HelpModalProps } from '../types';

export default function BorrowInterestHelpModal({ text }: HelpModalProps) {
  return (
    <div className="BorrowInterestHelpModal">
      {text}
      <style jsx>{`
        .BorrowInterestHelpModal {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
