export interface NextPage {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
