import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Edit, Trash2, ImagePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from '@/components/ui/separator';

const ProductForm = ({ product, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(
    product || {
      name: { en: '', ar: '' },
      description: { en: '', ar: '' },
      category: '',
      price: '',
      stock: '',
      images: ['', '', ''],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLangChange = (e, lang, field) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{product ? t('edit') : t('add_product')}</DialogTitle>
        <DialogDescription>
          {product ? t('edit_product_details') : t('add_new_product_details')}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-2">
        <div className="space-y-2">
          <Label htmlFor="name-en">Name (EN)</Label>
          <Input id="name-en" value={formData.name?.en || ''} onChange={(e) => handleLangChange(e, 'en', 'name')} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name-ar">الاسم (AR)</Label>
          <Input id="name-ar" value={formData.name?.ar || ''} onChange={(e) => handleLangChange(e, 'ar', 'name')} dir="rtl" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description-en">Description (EN)</Label>
          <Textarea id="description-en" value={formData.description?.en || ''} onChange={(e) => handleLangChange(e, 'en', 'description')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description-ar">الوصف (AR)</Label>
          <Textarea id="description-ar" value={formData.description?.ar || ''} onChange={(e) => handleLangChange(e, 'ar', 'description')} dir="rtl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">{t('category')}</Label>
          <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="price">{t('price')} (ILS ₪)</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required placeholder="Enter price in ILS" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">{t('stock')}</Label>
          <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
        </div>
        
        <Separator />

        <div className="space-y-2">
          <Label>{t('product_images')}</Label>
          <div className="space-y-2">
            {(formData.images || []).map((img, index) => (
              <div key={index} className="flex items-center gap-2">
                <ImagePlus className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`${t('image_url')} ${index + 1}`}
                  value={img}
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
          </div>
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

const AdminProducts = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { products, addProduct, updateProduct, deleteProduct, getDisplayPrice, currency } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSaveProduct = (productData) => {
    const parsedProduct = {
      ...productData,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock, 10),
    };

    if (editingProduct) {
      updateProduct({ ...editingProduct, ...parsedProduct });
      toast({ title: t('product_updated') });
    } else {
      addProduct(parsedProduct);
      toast({ title: t('product_added') });
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    const productWithImages = {
      ...product,
      images: product.images ? [...product.images, ...Array(3 - product.images.length).fill('')] : ['', '', '']
    };
    setEditingProduct(productWithImages);
    setIsFormOpen(true);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
    toast({ title: t('product_deleted'), variant: 'destructive' });
  };

  return (
    <>
      <PageTitle title={t('admin_products')} />
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('admin_products')}</h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_product')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={() => { setIsFormOpen(false); setEditingProduct(null); }} />
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin_products')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('product_name')}</TableHead>
                  <TableHead>{t('category')}</TableHead>
                  <TableHead>{t('price')}</TableHead>
                  <TableHead>{t('stock')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name[i18n.language] || product.name['en']}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{currency.symbol}{getDisplayPrice(product.price).toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(product)}><Edit className="mr-2 h-4 w-4" />{t('edit')}</DropdownMenuItem>
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
                                <AlertDialogAction onClick={() => handleDelete(product.id)}>{t('delete')}</AlertDialogAction>
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

export default AdminProducts;