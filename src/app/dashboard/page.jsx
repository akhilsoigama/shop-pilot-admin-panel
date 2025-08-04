'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"



export default function DashboardHome() {

    const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/login')
    }
  }, [])

  return (
    // <div className="grid gap-4 md:grid-cols-3">
    //   <div className="bg-muted/50 aspect-video rounded-xl" />
    //   <div className="bg-muted/50 aspect-video rounded-xl" />
    //   <div className="bg-muted/50 aspect-video rounded-xl" />
    // </div>
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
          </div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>

  )
}