import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

import { Children } from "@@types/Children";

type Props = {
  icon?: JSX.Element;
  isLoading?: boolean;
} & Children &
  TouchableOpacityProps;

export const Button = ({ children, isLoading, icon, ...rest }: Props) => {
  return (
    <TouchableOpacity
      className="w-full max-w-xs flex-row items-center justify-center space-x-2 rounded-md bg-blue-600 p-4"
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {icon && icon}
          <Text className="text-center font-title text-sm uppercase text-white">
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
