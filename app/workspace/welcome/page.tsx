import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCookie } from '@/modules/utils/cookiesUtil';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glance for Docusign',
  description: 'Generative AI Assistant for Docusign documents',
};

export default function Page() {
  const cookieAccountName = getCookie('dai_accountName');
  const cookieAccountId = getCookie('dai_accountId');

  return (
    <>
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Welcome</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Account Name</CardTitle>
              <CardDescription>Your default account name</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-l font-bold">{cookieAccountName}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account Id</CardTitle>
              <CardDescription>Your default account ID</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-l font-bold">{cookieAccountId}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>What would you like to do?</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                'Ask questions on an agreement document',
                'Ask questions on multiple agreement documents at once',
                'Create a knowledge base from all my agreement documents',
              ].map((activity, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
