import ClientView from '@/views/client-view';

export default function DashboardPage() {
  return (
    <ClientView>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Client Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your dashboard. Manage your orders and profile here.
            </p>
          </div>
        </div>
      </div>
    </ClientView>
  );
}
