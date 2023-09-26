import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="w-screen h-screen bg-black text-white flex justify-center items-center">
      <SignUp
        afterSignInUrl="/journal"
        afterSignUpUrl="/new-user"
        routing="path"
      />
    </main>
  )
}
