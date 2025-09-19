import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext, ROLES } from '@/contexts/AppContext';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const UserForm = ({ user, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(
    user || {
      name: '',
      email: '',
      role: ROLES.SUBSCRIBER,
      password: '',
    }
  );

  const userRoles = Object.values(ROLES);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{user ? t('edit_user') : t('add_user')}</DialogTitle>
        <DialogDescription>
          {user ? t('edit_user_details') : t('add_new_user_details')}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">{t('user_name')}</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">{t('email')}</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">{t('password')}</Label>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="col-span-3" placeholder={user ? "Leave blank to keep unchanged" : ""} required={!user} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">{t('role')}</Label>
          <Select value={formData.role} onValueChange={handleRoleChange}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {userRoles.map(role => (
                <SelectItem key={role} value={role}>{t(`role_${role.toLowerCase()}`)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary" onClick={onCancel}>{t('cancel')}</Button>
        </DialogClose>
        <Button type="submit">{t('save')}</Button>
      </DialogFooter>
    </form>
  );
};

const AdminUsers = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { users, addUser, updateUser, deleteUser, currentUser } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSaveUser = (userData) => {
    if (editingUser) {
      const payload = { ...editingUser, ...userData };
      if (!userData.password) {
        delete payload.password;
      }
      updateUser(payload);
      toast({ title: t('user_updated') });
    } else {
      addUser(userData);
      toast({ title: t('user_added') });
    }
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
    toast({ title: t('user_deleted'), variant: 'destructive' });
  };

  const getRoleVariant = (role) => {
    switch (role) {
      case ROLES.ADMIN: return 'destructive';
      case ROLES.MODERATOR: return 'secondary';
      case ROLES.INVESTOR: return 'outline';
      case ROLES.AGENT: return 'default';
      case ROLES.CUSTOMER: return 'default';
      default: return 'default';
    }
  };

  return (
    <>
      <PageTitle title={t('admin_users')} />
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('admin_users')}</h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingUser(null); setIsFormOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_user')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <UserForm user={editingUser} onSave={handleSaveUser} onCancel={() => { setIsFormOpen(false); setEditingUser(null); }} />
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin_users')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('user_name')}</TableHead>
                  <TableHead>{t('email')}</TableHead>
                  <TableHead>{t('role')}</TableHead>
                  <TableHead>{t('joined_date')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleVariant(user.role)}>{t(`role_${user.role.toLowerCase()}`)}</Badge>
                    </TableCell>
                    <TableCell>{user.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0" disabled={user.id === currentUser.id}>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(user)}><Edit className="mr-2 h-4 w-4" />{t('edit')}</DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" className="w-full justify-start text-sm p-2 font-normal text-destructive hover:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />{t('delete')}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{t('are_you_sure')}</AlertDialogTitle>
                                <AlertDialogDescription>{t('delete_confirmation')}</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(user.id)}>{t('delete')}</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminUsers;