import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not defined');
  }

  const pool = new Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('🌱 Starting seed...');

  // Создаем пользователей (vendors)
  const vendor1 = await prisma.user.upsert({
    where: { email: 'vendor1@example.com' },
    update: {},
    create: {
      email: 'vendor1@example.com',
      name: 'Tech Vendor Inc',
      bio: 'Premium electronics and gadgets supplier',
      role: 'VENDOR',
    },
  });

  const vendor2 = await prisma.user.upsert({
    where: { email: 'vendor2@example.com' },
    update: {},
    create: {
      email: 'vendor2@example.com',
      name: 'Fashion House',
      bio: 'Trendy clothing and accessories',
      role: 'VENDOR',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      bio: 'System administrator',
      role: 'ADMIN',
    },
  });

  console.log('✅ Users created:', { vendor1: vendor1.id, vendor2: vendor2.id, admin: admin.id });

  // Создаем продукты для Tech Vendor
  const products1 = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wireless Headphones Pro',
        description: 'Premium noise-cancelling wireless headphones with 30h battery life',
        slug: 'wireless-headphones-pro',
        sku: 'WHP-001',
        price: 299.99,
        currency: 'USD',
        stock: 50,
        category: 'Electronics',
        tags: ['audio', 'wireless', 'headphones', 'premium'],
        images: ['https://example.com/images/headphones-pro-1.jpg', 'https://example.com/images/headphones-pro-2.jpg'],
        weight: 0.25,
        dimensions: { length: 20, width: 18, height: 8 },
        status: 'ACTIVE',
        isFeatured: true,
        rating: 4.8,
        reviewCount: 124,
        vendorId: vendor1.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smart Watch Ultra',
        description: 'Advanced smartwatch with health monitoring and GPS',
        slug: 'smart-watch-ultra',
        sku: 'SWU-002',
        price: 449.99,
        currency: 'USD',
        stock: 30,
        category: 'Electronics',
        tags: ['wearable', 'smartwatch', 'fitness', 'gps'],
        images: ['https://example.com/images/smartwatch-1.jpg', 'https://example.com/images/smartwatch-2.jpg'],
        weight: 0.05,
        dimensions: { length: 5, width: 4, height: 1.5 },
        status: 'ACTIVE',
        isFeatured: true,
        rating: 4.6,
        reviewCount: 89,
        vendorId: vendor1.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'USB-C Hub 7-in-1',
        description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader',
        slug: 'usb-c-hub-7in1',
        sku: 'HUB-003',
        price: 59.99,
        currency: 'USD',
        stock: 100,
        category: 'Electronics',
        tags: ['accessories', 'usb-c', 'hub', 'adapter'],
        images: ['https://example.com/images/usb-hub-1.jpg'],
        weight: 0.1,
        dimensions: { length: 12, width: 5, height: 1.5 },
        status: 'ACTIVE',
        isFeatured: false,
        rating: 4.3,
        reviewCount: 56,
        vendorId: vendor1.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mechanical Keyboard RGB',
        description: 'Gaming mechanical keyboard with Cherry MX switches and RGB backlight',
        slug: 'mechanical-keyboard-rgb',
        sku: 'MKB-004',
        price: 129.99,
        currency: 'USD',
        stock: 45,
        category: 'Electronics',
        tags: ['gaming', 'keyboard', 'mechanical', 'rgb'],
        images: ['https://example.com/images/keyboard-1.jpg', 'https://example.com/images/keyboard-2.jpg'],
        weight: 1.2,
        dimensions: { length: 44, width: 14, height: 4 },
        status: 'ACTIVE',
        isFeatured: false,
        rating: 4.7,
        reviewCount: 203,
        vendorId: vendor1.id,
      },
    }),
    prisma.product.create({
      data: {
        name: '4K Webcam',
        description: 'Professional 4K webcam with auto-focus and built-in microphone',
        slug: '4k-webcam',
        sku: 'WBC-005',
        price: 179.99,
        currency: 'USD',
        stock: 25,
        category: 'Electronics',
        tags: ['camera', 'webcam', '4k', 'streaming'],
        images: ['https://example.com/images/webcam-1.jpg'],
        weight: 0.3,
        dimensions: { length: 10, width: 6, height: 6 },
        status: 'ACTIVE',
        isFeatured: false,
        rating: 4.4,
        reviewCount: 67,
        vendorId: vendor1.id,
      },
    }),
  ]);

  console.log('✅ Tech Vendor products created:', products1.length);

  // Создаем продукты для Fashion House
  const products2 = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Classic Leather Jacket',
        description: 'Genuine leather jacket with modern fit',
        slug: 'classic-leather-jacket',
        sku: 'CLJ-101',
        price: 349.99,
        currency: 'USD',
        stock: 20,
        category: 'Clothing',
        tags: ['jacket', 'leather', 'fashion', 'outerwear'],
        images: ['https://example.com/images/leather-jacket-1.jpg', 'https://example.com/images/leather-jacket-2.jpg'],
        weight: 1.5,
        dimensions: { length: 60, width: 50, height: 5 },
        status: 'ACTIVE',
        isFeatured: true,
        rating: 4.9,
        reviewCount: 45,
        vendorId: vendor2.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Slim Fit Jeans',
        description: 'Premium denim slim fit jeans in classic blue',
        slug: 'slim-fit-jeans',
        sku: 'SFJ-102',
        price: 89.99,
        currency: 'USD',
        stock: 80,
        category: 'Clothing',
        tags: ['jeans', 'denim', 'pants', 'casual'],
        images: ['https://example.com/images/jeans-1.jpg'],
        weight: 0.6,
        dimensions: { length: 40, width: 30, height: 3 },
        status: 'ACTIVE',
        isFeatured: false,
        rating: 4.5,
        reviewCount: 112,
        vendorId: vendor2.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Cotton T-Shirt Pack (3pcs)',
        description: 'Pack of 3 premium cotton t-shirts in assorted colors',
        slug: 'cotton-tshirt-pack-3pcs',
        sku: 'CTS-103',
        price: 49.99,
        currency: 'USD',
        stock: 150,
        category: 'Clothing',
        tags: ['t-shirt', 'cotton', 'basics', 'pack'],
        images: ['https://example.com/images/tshirt-pack-1.jpg'],
        weight: 0.5,
        dimensions: { length: 30, width: 25, height: 5 },
        status: 'ACTIVE',
        isFeatured: false,
        rating: 4.2,
        reviewCount: 234,
        vendorId: vendor2.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Designer Sunglasses',
        description: 'UV protection designer sunglasses with polarized lenses',
        slug: 'designer-sunglasses',
        sku: 'DSG-104',
        price: 159.99,
        currency: 'USD',
        stock: 35,
        category: 'Accessories',
        tags: ['sunglasses', 'accessories', 'designer', 'uv-protection'],
        images: ['https://example.com/images/sunglasses-1.jpg', 'https://example.com/images/sunglasses-2.jpg'],
        weight: 0.03,
        dimensions: { length: 15, width: 6, height: 5 },
        status: 'ACTIVE',
        isFeatured: true,
        rating: 4.6,
        reviewCount: 78,
        vendorId: vendor2.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Leather Belt',
        description: 'Genuine leather belt with metal buckle',
        slug: 'leather-belt',
        sku: 'LBT-105',
        price: 39.99,
        currency: 'USD',
        stock: 60,
        category: 'Accessories',
        tags: ['belt', 'leather', 'accessories'],
        images: ['https://example.com/images/belt-1.jpg'],
        weight: 0.2,
        dimensions: { length: 120, width: 4, height: 0.5 },
        status: 'ACTIVE',
        isFeatured: false,
        rating: 4.4,
        reviewCount: 91,
        vendorId: vendor2.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Canvas Backpack',
        description: 'Vintage canvas backpack with laptop compartment',
        slug: 'canvas-backpack',
        sku: 'CBP-106',
        price: 79.99,
        currency: 'USD',
        stock: 40,
        category: 'Accessories',
        tags: ['backpack', 'canvas', 'bag', 'laptop'],
        images: ['https://example.com/images/backpack-1.jpg'],
        weight: 0.8,
        dimensions: { length: 45, width: 30, height: 15 },
        status: 'ACTIVE',
        isFeatured: false,
        rating: 4.5,
        reviewCount: 156,
        vendorId: vendor2.id,
      },
    }),
  ]);

  console.log('✅ Fashion House products created:', products2.length);

  // Создаем черновик продукта (не опубликован)
  await prisma.product.create({
    data: {
      name: 'Upcoming Product Draft',
      description: 'This product is not yet published',
      slug: 'upcoming-product-draft',
      sku: 'DFT-999',
      price: 0,
      currency: 'USD',
      stock: 0,
      category: 'Draft',
      tags: ['draft'],
      images: [],
      status: 'DRAFT',
      isFeatured: false,
      rating: 0,
      reviewCount: 0,
      vendorId: admin.id,
    },
  });

  console.log('✅ Draft product created');

  // Итоговая статистика
  const userCount = await prisma.user.count();
  const productCount = await prisma.product.count();

  console.log('\n📊 Seed Summary:');
  console.log(`   Users: ${userCount}`);
  console.log(`   Products: ${productCount}`);
  console.log('\n✨ Seed completed successfully!');

  await pool.end();
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  });
