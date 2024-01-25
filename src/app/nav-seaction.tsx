'use client'

import Avatar from 'react-avatar'

interface NavSectionProps {
  fullName: string | null
}

export default function NavSection({ fullName }: NavSectionProps) {
  return (
    <div className="flex items-center gap-2 ml-8">
      <Avatar round size="50" name={fullName || ''} />
    </div>
  )
}
