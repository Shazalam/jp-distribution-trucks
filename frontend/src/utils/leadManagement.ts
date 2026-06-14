import { Lead } from "@/models/Lead";

/**
 * Generate a sequential Request ID like JPQ-2026-0001
 */
export async function generateRequestId(): Promise<string> {
  const currentYear = new Date().getFullYear();
  const prefix = `JPQ-${currentYear}-`;

  // Find the latest lead created this year
  const latestLead = await Lead.findOne({ requestId: { $regex: `^${prefix}` } })
    .sort({ createdAt: -1 })
    .exec();

  let nextNumber = 1;
  if (latestLead && latestLead.requestId) {
    const parts = latestLead.requestId.split("-");
    const lastNum = parseInt(parts[2], 10);
    if (!isNaN(lastNum)) {
      nextNumber = lastNum + 1;
    }
  }

  return `${prefix}${nextNumber.toString().padStart(4, "0")}`;
}

/**
 * Detects if the user has submitted a form recently (within 24 hours)
 */
export async function detectDuplicate(email: string, phone: string): Promise<{ isDuplicate: boolean; reason?: string }> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const existingLead = await Lead.findOne({
    $or: [{ email }, { phone }],
    createdAt: { $gte: twentyFourHoursAgo }
  })
    .sort({ createdAt: -1 })
    .exec();

  if (existingLead) {
    const reason = existingLead.email === email 
      ? `Same email submitted within 24 hours (Ref: ${existingLead.requestId})`
      : `Same phone submitted within 24 hours (Ref: ${existingLead.requestId})`;
      
    return { isDuplicate: true, reason };
  }

  return { isDuplicate: false };
}

/**
 * Automatically determine the priority of a lead based on the submitted data
 */
export function priorityResolver(payload: any): string {
  const formType = payload.formType?.toLowerCase() || "";
  const message = payload.message?.toLowerCase() || "";
  const requestDetails = payload.requestDetails || {};
  
  if (formType.includes("wholesale") || message.includes("wholesale")) {
    return "Wholesale";
  }
  
  if (
    formType.includes("bulk") || 
    requestDetails.quantity >= 5 || 
    message.includes("bulk order")
  ) {
    return "Bulk Order";
  }

  if (
    formType.includes("adventure") || 
    formType.includes("custom build") || 
    payload.selectedBuild
  ) {
    return "Custom Build";
  }

  if (formType.includes("part") || payload.selectedPart) {
    return "Parts Request";
  }
  
  if (formType.includes("commercial")) {
    return "Commercial Vehicle";
  }

  if (requestDetails.timeline?.toLowerCase().includes("urgent") || message.includes("urgent")) {
    return "Urgent";
  }

  return "Normal";
}
