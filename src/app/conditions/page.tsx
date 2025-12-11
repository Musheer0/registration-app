import Link from "next/link"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Terms of Service - EventHub",
  description: "EventHub Terms of Service - Read our terms and conditions for using our platform.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            <span className="text-xl font-bold">EventHub</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="container max-w-4xl px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using EventHub ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p>
              These Terms of Service ("Terms") govern your access to and use of EventHub's website, mobile application, and related services (collectively, the "Service"). By using the Service, you agree to these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="mb-4">
              EventHub is an event registration and management platform that allows users to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Create and manage events</li>
              <li>Register for events</li>
              <li>Track event registrations and statistics</li>
              <li>Manage participant information</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Account Creation</h3>
            <p className="mb-4">
              To use certain features of the Service, you must create an account using Google OAuth. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Account Responsibilities</h3>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Account Termination</h3>
            <p className="mb-4">
              We reserve the right to suspend or terminate your account at any time, with or without notice, for violation of these Terms or for any other reason we deem necessary.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Violate or infringe upon the rights of others</li>
              <li>Transmit any harmful, offensive, or inappropriate content</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Attempt to gain unauthorized access to any portion of the Service</li>
              <li>Use automated systems to access the Service without permission</li>
              <li>Collect or harvest information about other users</li>
              <li>Create events that are fraudulent, misleading, or harmful</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Event Creation and Management</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Event Organizers</h3>
            <p className="mb-4">
              As an event organizer, you are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Providing accurate event information</li>
              <li>Complying with all applicable laws and regulations</li>
              <li>Managing registrations and communicating with participants</li>
              <li>Protecting participant data in accordance with privacy laws</li>
              <li>Fulfilling any promises or commitments made in your event description</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Event Content</h3>
            <p className="mb-4">
              You retain ownership of content you create, but grant us a license to use, display, and distribute your content through the Service. You represent and warrant that you have all necessary rights to the content you submit.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Prohibited Events</h3>
            <p className="mb-4">You may not create events that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Promote illegal activities</li>
              <li>Violate intellectual property rights</li>
              <li>Are fraudulent or misleading</li>
              <li>Promote hate speech or discrimination</li>
              <li>Involve gambling or other regulated activities without proper authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Event Registration</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Registration Process</h3>
            <p className="mb-4">
              When registering for an event, you agree to provide accurate information, including your name, email, USN, and phone number. You understand that this information will be shared with the event organizer.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Registration Cancellation</h3>
            <p className="mb-4">
              Registration cancellation policies are determined by individual event organizers. We are not responsible for refunds or cancellations unless explicitly stated otherwise.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Event Participation</h3>
            <p className="mb-4">
              Your participation in events is at your own risk. We are not responsible for any injuries, damages, or losses that occur during events organized through our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p className="mb-4">
              The Service and its original content, features, and functionality are owned by EventHub and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="mb-4">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any part of the Service without our prior written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Payment and Fees</h2>
            <p className="mb-4">
              Currently, EventHub is provided free of charge. We reserve the right to introduce fees or charges in the future. If we do so, we will provide advance notice and obtain your consent before charging any fees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Disclaimers</h2>
            <p className="mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Merchantability and fitness for a particular purpose</li>
              <li>Non-infringement of third-party rights</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Accuracy, completeness, or reliability of content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, EVENTHUB SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p>
              Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim, or $100, whichever is greater.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless EventHub, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Content you submit or transmit through the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p className="mb-4">
              Upon termination, your right to use the Service will cease immediately. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p className="mb-4">
              What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Severability</h2>
            <p className="mb-4">
              If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions will remain in effect. These Terms constitute the entire agreement between you and EventHub regarding the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> legal@eventhub.com</li>
              <li><strong>Website:</strong> <Link href="/contact" className="text-primary hover:underline">Contact Page</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

