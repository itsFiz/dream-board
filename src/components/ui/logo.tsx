interface DreamBoardLogoProps {
  className?: string
}

export function DreamBoardLogo({ className }: DreamBoardLogoProps) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="32" height="32" rx="8" fill="#8B5CF6" />
        <path
          d="M8 12C8 9.79086 9.79086 8 12 8H20C22.2091 8 24 9.79086 24 12V20C24 22.2091 22.2091 24 20 24H12C9.79086 24 8 22.2091 8 20V12Z"
          fill="white"
        />
        <path
          d="M12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16Z"
          fill="#8B5CF6"
        />
        <path
          d="M14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16Z"
          fill="white"
        />
      </svg>
    </div>
  )
}
