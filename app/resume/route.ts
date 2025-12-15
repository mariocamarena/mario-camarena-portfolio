import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "CS_Mario_Camarena_Resume.pdf")

  try {
    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=CS_Mario_Camarena_Resume.pdf",
      },
    })
  } catch {
    return new NextResponse("Resume not found", { status: 404 })
  }
}
