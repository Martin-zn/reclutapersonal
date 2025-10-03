import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

import Card from '@/components/Card/index';
import Button from '@/components/Button';
import api from '@/lib/common/api';
import { getInvitation } from '@/prisma/services/workspace';

const Invite = ({ workspace }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [isSubmitting, setSubmittingState] = useState(false);

  useEffect(() => {
    // Check for demo cookie
    const hasDemo = document.cookie.includes('demoEmail=');
    setIsAuthenticated(hasDemo);
  }, []);

  const join = () => {
    setSubmittingState(true);
    api(`/api/workspace/team/join`, {
      body: { workspaceCode: workspace.workspaceCode },
      method: 'POST',
    }).then((response) => {
      setSubmittingState(false);

      if (response.errors) {
        if (response.status === 422) {
          router.replace('/account');
        }

        Object.keys(response.errors).forEach((error) =>
          toast.error(response.errors[error].msg)
        );
      } else {
        toast.success('Accepted invitation!');
      }
    });
  };

  return (
    <main className="relative flex flex-col items-center justify-center h-screen space-y-10">
      <Toaster position="bottom-center" toastOptions={{ duration: 10000 }} />
      <div className="w-full py-5">
        <div className="relative flex flex-col mx-auto space-y-5">
          <div className="flex flex-col items-center justify-center mx-auto">
            <Card>
              <Card.Body
                title={workspace.name}
                subtitle="You are invited to join this workspace."
              />
              <Card.Footer>
                {isAuthenticated ? (
                  <Button
                    className="text-white bg-brand-orange hover:opacity-90"
                    disabled={isSubmitting}
                    onClick={join}
                  >
                    Join Workspace
                  </Button>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center px-5 py-2 space-x-3 text-white bg-brand-orange rounded hover:opacity-90"
                  >
                    Create an account
                  </Link>
                )}
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const { code } = context.query;
  const workspace = await getInvitation(code);
  return { props: { workspace } };
};

export default Invite;
