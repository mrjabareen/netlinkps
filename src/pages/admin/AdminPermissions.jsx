import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext, ROLES, PERMISSIONS } from '@/contexts/AppContext';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';

const AdminPermissions = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { permissions, updatePermissions } = useAppContext();
  const [currentPermissions, setCurrentPermissions] = useState(permissions);

  const handlePermissionChange = (role, permission, value) => {
    setCurrentPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: value,
      },
    }));
  };

  const handleSave = () => {
    updatePermissions(currentPermissions);
    toast({
      title: t('permissions_updated'),
      description: t('permissions_updated_desc'),
    });
  };

  const rolesOrder = Object.values(ROLES).filter(role => role !== ROLES.ADMIN);
  const permissionsOrder = Object.values(PERMISSIONS);

  return (
    <>
      <PageTitle title={t('admin_permissions')} />
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('admin_permissions')}</h1>
            <p className="text-muted-foreground">{t('admin_permissions_desc')}</p>
          </div>
          <Button onClick={handleSave}>{t('save_changes')}</Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky left-0 bg-background z-10">{t('permission')}</TableHead>
                    {rolesOrder.map(role => (
                      <TableHead key={role} className="text-center">{t(`role_${role.toLowerCase()}`)}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionsOrder.map(permission => (
                    <TableRow key={permission}>
                      <TableCell className="font-medium sticky left-0 bg-background z-10">{t(`permission_${permission}`)}</TableCell>
                      {rolesOrder.map(role => (
                        <TableCell key={`${role}-${permission}`} className="text-center">
                          <Switch
                            checked={!!currentPermissions[role]?.[permission]}
                            onCheckedChange={(value) => handlePermissionChange(role, permission, value)}
                            aria-label={`${t(`role_${role.toLowerCase()}`)} - ${t(`permission_${permission}`)}`}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminPermissions;