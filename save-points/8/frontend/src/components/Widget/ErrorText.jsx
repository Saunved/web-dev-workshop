import { WarningCircle } from "phosphor-react";

const ErrorText = ({ message }) => {
  return (
    <div className="mt-2 font-medium text-red-600" role="alert">
      <div className="flex items-center">
        <WarningCircle size={20} weight="fill" className="mr-1 text-red-500" />
        {message}
      </div>
    </div>
  );
};

export default ErrorText;
