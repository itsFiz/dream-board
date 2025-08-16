import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default categories
  const categories = [
    { name: 'Transportation', color: '#3B82F6', icon: '🚗' },
    { name: 'Travel', color: '#10B981', icon: '✈️' },
    { name: 'Technology', color: '#8B5CF6', icon: '💻' },
    { name: 'Financial', color: '#F59E0B', icon: '💰' },
    { name: 'Education', color: '#EF4444', icon: '🎓' },
    { name: 'Health', color: '#EC4899', icon: '🏥' },
    { name: 'Entertainment', color: '#06B6D4', icon: '🎮' },
    { name: 'Home', color: '#84CC16', icon: '🏠' },
    { name: 'Business', color: '#F97316', icon: '💼' },
  ]

  console.log('📝 Creating categories...')
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        color: category.color,
        icon: category.icon,
      },
    })
  }

  // Create a sample user
  console.log('👤 Creating sample user...')
  const user = await prisma.user.upsert({
    where: { email: 'demo@dreamboard.com' },
    update: {},
    create: {
      email: 'demo@dreamboard.com',
      name: 'Demo User',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKjqG', // password: demo123
    },
  })

  // Create a sample dream board
  console.log('🎯 Creating sample dream board...')
  const dreamBoard = await prisma.dreamBoard.create({
    data: {
      title: 'My Life Goals',
      description: 'A collection of my most important life goals and dreams',
      isPublic: false,
      userId: user.id,
    },
  })

  // Get categories for creating dreams
  const transportationCategory = await prisma.category.findUnique({
    where: { name: 'Transportation' },
  })
  const travelCategory = await prisma.category.findUnique({
    where: { name: 'Travel' },
  })
  const financialCategory = await prisma.category.findUnique({
    where: { name: 'Financial' },
  })

  // Create sample dreams
  console.log('💭 Creating sample dreams...')
  if (transportationCategory) {
    await prisma.dream.create({
      data: {
        title: 'New Electric Car',
        description: 'A Tesla Model 3 or similar electric vehicle',
        categoryId: transportationCategory.id,
        estimatedCost: 45000,
        deadlineYear: 2025,
        deadlineMonth: 6,
        priorityLevel: 'high',
        emoji: '🚗',
        timelineYear: 2025,
        timelineMonth: 6,
        status: 'planning',
        dreamboardId: dreamBoard.id,
      },
    })
  }

  if (travelCategory) {
    await prisma.dream.create({
      data: {
        title: 'Vacation to Japan',
        description: 'Two-week trip to Tokyo, Kyoto, and Osaka',
        categoryId: travelCategory.id,
        estimatedCost: 8000,
        deadlineYear: 2024,
        deadlineMonth: 12,
        priorityLevel: 'medium',
        emoji: '✈️',
        timelineYear: 2024,
        timelineMonth: 12,
        status: 'planning',
        dreamboardId: dreamBoard.id,
      },
    })
  }

  if (financialCategory) {
    await prisma.dream.create({
      data: {
        title: 'Emergency Fund',
        description: 'Build a 6-month emergency fund',
        categoryId: financialCategory.id,
        estimatedCost: 15000,
        deadlineYear: 2024,
        deadlineMonth: 12,
        priorityLevel: 'high',
        emoji: '💰',
        timelineYear: 2024,
        timelineMonth: 12,
        status: 'in_progress',
        dreamboardId: dreamBoard.id,
      },
    })
  }

  // Create sample income streams
  console.log('💵 Creating sample income streams...')
  await prisma.incomeStream.create({
    data: {
      name: 'Full-time Job',
      amount: 6500,
      frequency: 'monthly',
      startDate: new Date('2024-01-01'),
      growthPercentage: 5,
      isRecurring: true,
      category: 'Employment',
      dreamboardId: dreamBoard.id,
    },
  })

  await prisma.incomeStream.create({
    data: {
      name: 'Freelance Design',
      amount: 1500,
      frequency: 'monthly',
      startDate: new Date('2024-01-01'),
      growthPercentage: 10,
      isRecurring: true,
      category: 'Freelance',
      dreamboardId: dreamBoard.id,
    },
  })

  console.log('✅ Database seeding completed successfully!')
  console.log('📧 Demo user email: demo@dreamboard.com')
  console.log('🔑 Demo user password: demo123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
