declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.css'

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.scss'

declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.sass'

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}