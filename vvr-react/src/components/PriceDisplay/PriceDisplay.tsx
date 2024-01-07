import "./_price-display.scss";

type PriceDisplayProps = {
  value: number;
};

const PriceDisplay: React.FC<PriceDisplayProps> = ({ value }) => {
  var strValue = value.toFixed(2);

  var parts = strValue.split(".");

  var dollars = parts[0];
  var cents = parts[1];

  return (
    <span className="price-display">
      <span className="price-display__dollars">$ {dollars}</span>
      <sup className="price-display__cents">{cents}</sup>
    </span>
  );
};

export default PriceDisplay;
