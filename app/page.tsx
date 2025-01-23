import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { DocusignLoginButton } from '@/components/atoms/DocusignLoginButton/DocusignLoginButton';
import { EmailContactLink } from '@/components/atoms/EmailContactLink/EmailContactLink';

// const screenshotWidth = 800;
// const screenshotHeight = 450;
const screenshotWidth = 640;
const screenshotHeight = 360;

export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-white z-50">
        <Link className="flex items-center justify-center" href="#">
          <Image src="/assets/glance-logo-wide-light.svg" alt="Glance for Docusign" width={100} height={40} />
          <span className="sr-only">AI for Docusign</span>
        </Link>
        <nav className="ml-4 flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center">
          <div className="flex items-center gap-2">
            <DocusignLoginButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 dark:bg-gray-800 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-44 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Glance <span className="text-2xl">for Docusign</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-8">
                Your AI Assistant for Documents and Agreements. Simplify document management with an AI-powered chatbot tailored for Docusign.
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4 mt-12 lg:order-2">
                  <h3 className="text-2xl font-bold">Get Quick Insights on Your Agreements</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Glance uses advanced generative AI to quickly analyze your documents and agreements, providing clear, concise answers at your fingertips.
                  </p>
                  <div className="flex-grow flex flex-wrap gap-2">
                    {[
                      'When does this contract expire?',
                      'Give me a summary of this file',
                      'List all the parties involved',
                      'What contact information is listed?',
                      'Key points in this document',
                    ].map((category) => (
                      <Button key={category}>
                        <span className="ml-2">{category}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="aspect-video overflow-hidden lg:order-1">
                  <Image
                    src="/assets/screenshots/screenshot-browse-prompts.png"
                    alt="Presets"
                    width={screenshotWidth}
                    height={screenshotHeight}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4 mt-12">
                  <h3 className="text-2xl font-bold">No Setup. Instant Support.</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Seamlessly integrates with Docusign to support Envelopes, Documents, and Navigator Agreements — no configuration needed.
                  </p>
                </div>
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/assets/screenshots/screenshot-prompt-config.png"
                    alt="Prompt Library"
                    width={screenshotWidth}
                    height={screenshotHeight}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4 mt-12 lg:order-2">
                  <h3 className="text-2xl font-bold">Build-in AI models</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Glance comes with build in support for over ten top-tier large language models.
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-14 pt-8">
                    <Image src="/assets/ai/anthropic_24x24.svg" alt="anthropic" width={48} height={48} className="invert" />
                    <Image src="/assets/ai/amazon_24x24.svg" alt="amazon" width={48} height={48} className="invert" />
                    <Image src="/assets/ai/cohere_24x24.svg" alt="cohere" width={48} height={48} />
                    <Image src="/assets/ai/meta_24x24.svg" alt="meta" width={48} height={48} />
                    <Image src="/assets/ai/mistral_24x24.svg" alt="mistral" width={48} height={48} />
                  </div>
                </div>
                <div className="aspect-video overflow-hidden lg:order-1">
                  <Image
                    src="/assets/screenshots/screenshot-extensions.png"
                    alt="Plug-ins"
                    width={screenshotWidth}
                    height={screenshotHeight}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4 mt-12">
                  <h3 className="text-2xl font-bold">Compliant and Secure by Design</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                  Your privacy is our priority. Glance processes your documents securely without storing any private data, ensuring complete confidentiality while adhering to the highest compliance standards.
                  </p>
                </div>
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/assets/screenshots/screenshot-prompt-config.png"
                    alt="Prompt Library"
                    width={screenshotWidth}
                    height={screenshotHeight}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
        
      </main>

      <footer id="contact" className="bg-black text-white py-12 shadow-[0_-5px_15px_rgba(0,0,0,0.2)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
              <Image src="/assets/glance-logo-wide-light-transparent.svg" alt="Company Logo" width={120} height={40} />
              <p className="text-gray-400 my-4">
                Glance for Docusign is an easy to use Generate AI Assistant & Chatbot for your documents and agreements on Docusign.
              </p>
              <div>
                <h4 className="font-bold text-white mb-4">Connect with us</h4>
                <div className="flex space-x-4">
                  <EmailContactLink />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 flex flex-wrap">
              <div className="w-full sm:w-1/3 px-4 mb-8 sm:mb-0">
                <h3 className="text-lg font-semibold mb-4 text-white">Glance for Docusign</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Get Started
                    </Link>
                  </li>
                  <li>
                    <Link href="#features" className="text-gray-400 hover:text-white">
                      Features
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full sm:w-1/3 px-4 mb-8 sm:mb-0">
                <h3 className="text-lg font-semibold mb-4 text-white">Contribution</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="https://github.com/jnlewis/glance-for-docusign"
                      className="text-gray-400 hover:text-white"
                    >
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-24">
            <p className="text-center text-gray-500 text-sm">
              Developed by Jeffrey Lewis. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
