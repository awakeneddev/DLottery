import { Loader } from "lucide-react";

const SecondaryButton = ({ label, icon }) => {
  return (
    <button className="flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 bg-sky-400/20 text-sky-400 border border-emerald-400/20">
      {icon}
      {label}
    </button>
  );
};

const PrimaryButton = ({ label, isLoading = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 cursor-pointer rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-sky-400 hover:from-sky-300 to-emerald-400 text-gray-900 hover:shadow-lg hover:shadow-sky-400/20"
    >
      {isLoading ? (
        <Loader className="w-4 h-4 inline-block mr-2 text-gray-800/50" />
      ) : (
        `${label}`
      )}
    </button>
  );
};

export { PrimaryButton, SecondaryButton };
