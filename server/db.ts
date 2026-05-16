import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  categories,
  dramas,
  episodes,
  favorites,
  watchHistory,
  comments,
  subscriptionPlans,
  userSubscriptions,
  orders,
  InsertDrama,
  InsertCategory,
  InsertEpisode,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ User Operations ============
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ Drama Operations ============
export async function getAllDramas() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(dramas).where(eq(dramas.isPublished, true)).orderBy(desc(dramas.createdAt));
}

export async function getDramaById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(dramas).where(eq(dramas.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createDrama(data: InsertDrama) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(dramas).values(data);
}

export async function updateDrama(id: number, data: Partial<InsertDrama>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(dramas).set(data).where(eq(dramas.id, id));
}

export async function deleteDrama(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(dramas).where(eq(dramas.id, id));
}

// ============ Category Operations ============
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(categories).orderBy(categories.name);
}

export async function createCategory(data: InsertCategory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(categories).values(data);
}

export async function updateCategory(id: number, data: Partial<InsertCategory>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(categories).set(data).where(eq(categories.id, id));
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(categories).where(eq(categories.id, id));
}

// ============ Episode Operations ============
export async function getEpisodesByDramaId(dramaId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(episodes)
    .where(eq(episodes.dramaId, dramaId))
    .orderBy(episodes.episodeNumber);
}

export async function createEpisode(data: InsertEpisode) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(episodes).values(data);
}

export async function updateEpisode(id: number, data: Partial<InsertEpisode>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(episodes).set(data).where(eq(episodes.id, id));
}

export async function deleteEpisode(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(episodes).where(eq(episodes.id, id));
}

// ============ Favorite Operations ============
export async function getUserFavorites(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(favorites).where(eq(favorites.userId, userId));
}

export async function addFavorite(userId: number, dramaId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(favorites).values({ userId, dramaId });
}

export async function removeFavorite(userId: number, dramaId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .delete(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.dramaId, dramaId)));
}

// ============ Subscription Operations ============
export async function getAllSubscriptionPlans() {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.isActive, true))
    .orderBy(subscriptionPlans.price);
}

export async function getUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(userSubscriptions)
    .where(
      and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, "active")
      )
    )
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ Order Operations ============
export async function createOrder(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(orders).values(data);
  return result;
}

export async function getOrderByNumber(orderNumber: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, orderNumber))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateOrder(id: number, data: Partial<any>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(orders).set(data).where(eq(orders.id, id));
}

// ============ Comment Operations ============
export async function getDramaComments(dramaId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(comments)
    .where(
      and(
        eq(comments.dramaId, dramaId),
        eq(comments.isApproved, true)
      )
    )
    .orderBy(desc(comments.createdAt));
}

export async function createComment(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(comments).values(data);
}

export async function approveComment(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(comments).set({ isApproved: true }).where(eq(comments.id, id));
}

export async function deleteComment(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(comments).where(eq(comments.id, id));
}
