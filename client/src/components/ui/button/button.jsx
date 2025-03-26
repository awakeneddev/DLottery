const SecondaryButton = ({ label, icon }) => {
  return (
    <button className="flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-sky-400/20 text-sky-400 border border-emerald-400/20">
      {icon}
      {label}
    </button>
  );
};

const PrimaryButton = ({ label }) => {
  return (
    <button className="px-6 py-2 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-sky-400 to-emerald-400 text-gray-900 hover:shadow-lg hover:shadow-sky-400/20">
      {label}
    </button>
  );
};

export { PrimaryButton, SecondaryButton };
