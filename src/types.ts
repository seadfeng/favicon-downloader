export type ResponseInfo = {
  url: string;
  host: string,
  status: number;
  statusText: string;
  duration?: string | null;
  icons: {
    sizes?: string;
    href: string;
  }[]
}