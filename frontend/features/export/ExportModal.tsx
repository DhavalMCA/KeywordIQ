import { exportJson, exportCsv, exportTxt } from "./handlers/exportHandlers"
import type { KeywordAnalysis } from "@/lib/validators"
import { Download, FileJson, FileSpreadsheet, FileText, X } from "lucide-react"

interface ExportModalProps {
  data: KeywordAnalysis
  onClose: () => void
}

export function ExportModal({ data, onClose }: ExportModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#131318] border border-[#2A292F] rounded-sm p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#F0EFF5]">Export Results</h2>
          <button onClick={onClose} className="text-[#938E9E] hover:text-[#F0EFF5]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => { exportJson(data); onClose() }}
            className="w-full text-left px-4 py-3 border border-[#2A292F] rounded-sm hover:bg-[#1B1B20] transition-colors flex items-center gap-3"
          >
            <FileJson className="w-5 h-5 text-[#6E56CF]" />
            <div>
              <div className="font-medium text-[#F0EFF5]">JSON</div>
              <div className="text-sm text-[#938E9E]">Structured data format</div>
            </div>
          </button>
          <button
            onClick={() => { exportCsv(data); onClose() }}
            className="w-full text-left px-4 py-3 border border-[#2A292F] rounded-sm hover:bg-[#1B1B20] transition-colors flex items-center gap-3"
          >
            <FileSpreadsheet className="w-5 h-5 text-[#41EEC2]" />
            <div>
              <div className="font-medium text-[#F0EFF5]">CSV</div>
              <div className="text-sm text-[#938E9E]">Spreadsheet format</div>
            </div>
          </button>
          <button
            onClick={() => { exportTxt(data); onClose() }}
            className="w-full text-left px-4 py-3 border border-[#2A292F] rounded-sm hover:bg-[#1B1B20] transition-colors flex items-center gap-3"
          >
            <FileText className="w-5 h-5 text-[#FFB964]" />
            <div>
              <div className="font-medium text-[#F0EFF5]">TXT</div>
              <div className="text-sm text-[#938E9E]">Plain text format</div>
            </div>
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-[#938E9E] hover:text-[#F0EFF5]"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
