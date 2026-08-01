import SuccessContent from "@/components/SuccessContent";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const { order_id: orderId } = await searchParams;
  return <SuccessContent orderId={orderId} />;
}
