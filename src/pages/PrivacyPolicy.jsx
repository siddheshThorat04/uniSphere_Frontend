import React from 'react'
import { useDarkThemeContext } from '../contextApi/DarkTheme'
const PrivacyPolicy = () => {
  const {isDark} = useDarkThemeContext()
  return (
    <div className={isDark==="false"?'privacy_policy text-black':"privacy_policy text-white"}  >
        <h1 className=''  >Privacy Policy</h1>

Effective Date: 14-12-2024
<h4>1. Information We Collect</h4>
<p> Personal Information: username(could be NickName also), and College Name information provided during sign-up.
Activity Data: Messages, posts, and interactions across chats, news, and events.
Device & Technical Data: Device type, browser, and usage patterns.
</p>
<h4>2. How We Use Your Information</h4>
<p>
To deliver core features (chat, events, news).
To personalize your experience and content.
To maintain platform security and performance.
To send notifications about updates or events.
</p>
<h4>
3. How We Protect Your Information
</h4>
<p>
Data encryption for sensitive information.
Secure cloud storage (e.g., AWS S3) for files and images.
Regular audits to identify vulnerabilities.
</p>
<h4>
4. Data Sharing
</h4>
<p>
We do not sell your personal data. Data may be shared:

With trusted services like AWS for technical support.
As required by law (e.g., for investigation or compliance).
</p>
<h4>
5. Cookies & Tracking
</h4>
<p>

We use cookies to enhance functionality and track user behavior. You can manage cookie preferences via browser settings.
</p>
<h4>
6. Your Rights
</h4>
<p>
You can:

Access or update your profile information.
Request deletion of your account or data.
Opt-out of notifications or data processing for non-essential purposes.
For assistance, contact us at thoratsiddhu0000@gmail.com.
</p>
<h4>
7. Policy Updates
</h4>
<p>
Changes to this Privacy Policy will be posted here with an updated effective date.
</p>
<h1>
Terms of Use
</h1>

<h4>1. Acceptance of Terms</h4>
<p>
By accessing mateBatu.com, you agree to abide by these terms. If you disagree, please discontinue use.
</p>


<h4>2. User Responsibilities</h4>
<p>
Provide accurate information during registration.
Avoid harmful, offensive, or illegal content in posts or chats.
Respect other users and their privacy.</p>
<h4>3. Prohibited Activities</h4>
<p>Spamming or flooding chats with unwanted content.
Using the platform for illegal activities.
Attempting to hack, scrape, or misuse platform data.</p>
<h4>4. Content Ownership</h4>
<p>Users retain rights to their uploaded content (e.g., posts, images).
By uploading, you grant us a non-exclusive license to display and use your content for platform operations.</p>
<h4>
5. Termination of Access
</h4>
<p>We reserve the right to suspend or terminate user accounts that violate these terms.</p>
<h4>
6. Disclaimer of Liability
</h4>
<p>mateBatu.com is provided "as-is." While we strive for uninterrupted service, we are not liable for:

Data loss due to technical failures.
Misuse of the platform by other users.</p>
    </div>
  )
}

export default PrivacyPolicy
