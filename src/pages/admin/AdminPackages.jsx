import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const PackageForm = ({ pkg, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(
    pkg || {
      name: { en: '', ar: '' },
      speed: '',
      data: '',
      price: '',
      duration: { en: '', ar: '' },
      features: { en: [], ar: [] },
    }
  );

  const [featuresEn, setFeaturesEn] = useState(pkg?.features?.en?.join(', ') || '');
  const [featuresAr, setFeaturesAr] = useState(pkg?.features?.ar?.join(', ') || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [field, lang] = name.split('.');
      setFormData(prev => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const featuresEnArray = featuresEn.split(',').map(f => f.trim()).filter(f => f);
    const featuresArArray = featuresAr.split(',').map(f => f.trim()).filter(f => f);
    
    const finalData = {
      ...formData,
      features: {
        en: featuresEnArray,
        ar: featuresArArray,
      }
    };
    onSave(finalData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{pkg ? t('edit_package') : t('add_new_package')}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name.en" className="text-right">{t('package_name_en')}</Label>
          <Input id="name.en" name="name.en" value={formData.name.en} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name.ar" className="text-right">{t('package_name_ar')}</Label>
          <Input id="name.ar" name="name.ar" value={formData.name.ar} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="speed" className="text-right">{t('speed')} (Mbps)</Label>
          <Input id="speed" name="speed" type="number" value={formData.speed} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="data" className="text-right">{t('data')}</Label>
          <Input id="data" name="data" value={formData.data} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">{t('price')} (ILS)</Label>
          <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="duration.en" className="text-right">{t('duration_en')}</Label>
          <Input id="duration.en" name="duration.en" value={formData.duration.en} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="duration.ar" className="text-right">{t('duration_ar')}</Label>
          <Input id="duration.ar" name="duration.ar" value={formData.duration.ar} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="features.en" className="text-right">{t('features_en')}</Label>
          <Textarea id="features.en" value={featuresEn} onChange={(e) => setFeaturesEn(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="features.ar" className="text-right">{t('features_ar')}</Label>
          <Textarea id="features.ar" value={featuresAr} onChange={(e) => setFeaturesAr(e.target.value)} className="col-span-3" />
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

const AdminPackages = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { packages, addPackage, updatePackage, deletePackage, getDisplayPrice, currency, language } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const handleSavePackage = (packageData) => {
    if (editingPackage) {
      updatePackage({ ...editingPackage, ...packageData });
      toast({ title: t('package_updated') });
    } else {
      addPackage(packageData);
      toast({ title: t('package_added') });
    }
    setIsFormOpen(false);
    setEditingPackage(null);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setIsFormOpen(true);
  };

  const handleDelete = (packageId) => {
    deletePackage(packageId);
    toast({ title: t('package_deleted'), variant: 'destructive' });
  };

  return (
    <>
      <PageTitle title={t('admin_packages')} />
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('admin_packages')}</h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingPackage(null); setIsFormOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_package')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <PackageForm pkg={editingPackage} onSave={handleSavePackage} onCancel={() => { setIsFormOpen(false); setEditingPackage(null); }} />
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin_packages')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('package_name')}</TableHead>
                  <TableHead>{t('speed')}</TableHead>
                  <TableHead>{t('data')}</TableHead>
                  <TableHead>{t('price_monthly')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">{pkg.name[language] || pkg.name.en}</TableCell>
                    <TableCell>{pkg.speed} Mbps</TableCell>
                    <TableCell>{pkg.data}</TableCell>
                    <TableCell>{currency.symbol}{getDisplayPrice(pkg.price).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(pkg)}><Edit className="mr-2 h-4 w-4" />{t('edit')}</DropdownMenuItem>
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
                                <AlertDialogAction onClick={() => handleDelete(pkg.id)}>{t('delete')}</AlertDialogAction>
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

export default AdminPackages;