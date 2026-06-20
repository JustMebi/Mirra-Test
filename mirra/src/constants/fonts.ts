export const Fonts = {
  thin: 'Switzer-Thin',
  extraLight: 'Switzer-Extralight',
  light: 'Switzer-Light',
  regular: 'Switzer-Regular',
  medium: 'Switzer-Medium',
  semibold: 'Switzer-Semibold',
  bold: 'Switzer-Bold',
  extraBold: 'Switzer-Extrabold',
  black: 'Switzer-Black',
} as const;

export function switzerForWeight(weight?: string | number) {
  switch (`${weight ?? '400'}`) {
    case '100':
      return Fonts.thin;
    case '200':
      return Fonts.extraLight;
    case '300':
      return Fonts.light;
    case '500':
      return Fonts.medium;
    case '600':
      return Fonts.semibold;
    case '700':
      return Fonts.bold;
    case '800':
      return Fonts.extraBold;
    case '900':
      return Fonts.black;
    default:
      return Fonts.regular;
  }
}
