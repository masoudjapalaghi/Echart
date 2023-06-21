const NegativeValue = ({ value = "" }) => {
  const isNegative = value < 0;
  const replaceNegative = value.toString().replace("-", "");

  return (
    <span className={isNegative ? "text-error" : ""}>{isNegative ? `[ ${replaceNegative} ]` : replaceNegative}</span>
  );
};

export default NegativeValue;
