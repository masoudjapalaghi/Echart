const Typography = ({
  size = "h1",
  responsive = false,
  theme = "themeP",
  bold = false,
  persianNumber = false,
  component = "span",
  children,
  className = "",
  ...rest
}) => {
  let Element = component;
  const EnumSize = (size, responsive) => {
    return {
      h1: `text-sm ${responsive ? "md:text-lg" : ""} `,
      h2: `text-sm ${responsive ? "md:text-base" : ""}`,
      h3: `text-xs ${responsive ? "md:text-sm" : ""}`,
      h4: `text-small ${responsive ? "md:text-xs" : ""}`,
      h5: `text-mSmall`,
      h6: `text-base`,
      md: `text-base ${responsive ? "md:text-larg" : ""}`,
      lg: `text-lg`,
      xl: `text-xl`,
      "2xl": `text-2xl`,
      "2xxl": `text-larg`,
      "3xl": `text-3xl`,
      "4xl": `text-4xl`,
    }[size];
  };
  const EnumTheme = (theme) => {
    return {
      themeM: "textThemeM",
      themeP: "textThemeP",
      themeS: "textThemeS",
      themeT: "textThemeT",
      themeF: "textThemeF",
      error: "text-error",
      success: "text-sucsess",
      noColor: "",
    }[theme];
  };
  return (
    <Element
      className={`${EnumTheme(theme)} ${EnumSize(size,responsive)} ${
        bold ? "font-bold" : ""
      }${persianNumber ? "font-persianNumber" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Element>
  );
};

export default Typography;
