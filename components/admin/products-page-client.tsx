'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { formatPrice, formatDate, CATEGORY_LABELS } from '@/lib/format'

type Product = {
  id: string; name: string; slug: string; category: string
  price: number | null; images: string[]; featured: boolean; created_at: string
}

export function ProductsPageClient({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => initialProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || p.category === category
    return matchesSearch && matchesCategory
  }), [initialProducts, search, category])

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-4xl text-primary">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage everything in the Crochet Nook catalogue</p>
        </div>
        <Link href="/admin/products/new">
          <Button><Plus size={16} /> New Product</Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={category} onValueChange={(value) => {
    if (value) {
      setCategory(value)
    }
  }}>
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {initialProducts.length === 0 ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">No products match your search.</CardContent></Card>
      ) : (
        <Card className="overflow-hidden py-0">
          <Table className="hidden md:table">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill className="object-cover" />}
                    </div>
                    <span className="font-medium text-foreground">{product.name}</span>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{CATEGORY_LABELS[product.category] ?? product.category}</Badge></TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>{product.featured ? <Badge>Featured</Badge> : <span className="text-muted-foreground text-sm">—</span>}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{formatDate(product.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-sm text-primary hover:underline">Edit</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="md:hidden divide-y divide-border">
            {filtered.map((product) => (
              <div key={product.id} className="p-4 flex gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                  {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-foreground truncate">{product.name}</p>
                    {product.featured && <Badge>Featured</Badge>}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{CATEGORY_LABELS[product.category] ?? product.category}</Badge>
                    <span className="text-sm text-foreground">{formatPrice(product.price)}</span>
                  </div>
                  <Link href={`/admin/products/${product.id}/edit`} className="text-xs text-primary hover:underline mt-1 inline-block">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="p-16 text-center">
        <Package size={40} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="font-heading text-2xl text-primary mb-1">No products yet</h3>
        <p className="text-muted-foreground text-sm mb-6">Add your first handmade piece to get started.</p>
        <Link href="/admin/products/new"><Button><Plus size={16} /> New Product</Button></Link>
      </CardContent>
    </Card>
  )
}