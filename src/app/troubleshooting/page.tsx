import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/services";
import ServiceDetail from "@/components/ServiceDetail";

const service = getService("troubleshooting");

export const metadata: Metadata = {
  title: service?.title,
  description: service?.description,
};

export default function TroubleshootingPage() {
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
