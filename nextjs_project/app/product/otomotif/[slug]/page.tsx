import MotorcycleDetail from '@/../../components/pages/otomotif/MotorcycleDetail';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata(
  props: { params: { slug: string } }
): Promise<Metadata> {
  const { params } = props;

  return {
    title: `Detail Motor ${params.slug}`,
  };
}

export default async function Page(
  props: { params: { slug: string } }
) {
  const { params } = props;

  if (!params.slug) {
    notFound();
  }

  return <MotorcycleDetail slug={params.slug} />;
}
