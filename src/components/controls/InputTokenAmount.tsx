import BigNumber from "bignumber.js";
import { tokenAmountToFloat, tokenFloatToAmount } from "../../utils/tokens";

type InputTokenAmountProps = Omit<
React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
>, "onChange" | "value">
& {
  decimals: number,
  maxAmount: string | number,
  onChange: (value: string) => void,
  value: string
};

export const InputTokenAmount = ({
  decimals,
  maxAmount,
  value,
  onChange,
  ...props
}: InputTokenAmountProps) => (
  <input
    type="number"
    placeholder={decimals.toString()}
    step={1 / (10 ** decimals)}
    min={0}
    max={(BigNumber(maxAmount).dividedBy(BigNumber(10 ** decimals))).toNumber()}
    {...props}
    value={tokenAmountToFloat(value, decimals)}
    onChange={(e) => onChange(tokenFloatToAmount(e.target.value, decimals).toString())}
  />
);
