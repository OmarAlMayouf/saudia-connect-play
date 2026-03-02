import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { wordDatabase } from "@/data/words";

/**
 * Uploads the full word database to Firestore.
 *
 * Options:
 *   clearFirst — delete all existing words before uploading (useful for re-seeding).
 *
 * Usage (call once from a dev-only route or admin panel):
 *   await uploadWords({ clearFirst: true });
 */
export async function uploadWords(options: { clearFirst?: boolean } = {}) {
    try {
        if (options.clearFirst) {
            console.log("🗑️  Clearing existing words...");
            const snapshot = await getDocs(collection(db, "words"));
            const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            console.log(`Deleted ${snapshot.docs.length} existing words.`);
        }

        console.log(`📤 Uploading ${wordDatabase.length} words...`);

        // Batch in groups of 50 to avoid hammering Firestore
        const BATCH_SIZE = 50;
        for (let i = 0; i < wordDatabase.length; i += BATCH_SIZE) {
            const batch = wordDatabase.slice(i, i + BATCH_SIZE);
            await Promise.all(
                batch.map((word) =>
                    addDoc(collection(db, "words"), {
                        word: word.word,
                        category: word.category,
                        ...(word.region ? { region: word.region } : {}),
                        isActive: true,
                        createdAt: new Date(),
                    })
                )
            );
            console.log(`  ✅ Uploaded ${Math.min(i + BATCH_SIZE, wordDatabase.length)} / ${wordDatabase.length}`);
        }

        console.log("✅ Upload complete!");
    } catch (error) {
        console.error("❌ Error uploading words:", error);
        throw error;
    }
}
