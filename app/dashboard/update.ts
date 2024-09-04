import { db } from "@/lib/db";

type NewsletterUpdate = {
    id: number;
    name?: string;
    description?: string;
};

export default async function updateNewsletter({ id, name, description }: NewsletterUpdate) {
    try {
        // Ensure the ID is provided and valid
        if (!id || typeof id !== 'number' || id <= 0) {
            return { error: "Invalid or missing ID." };
        }

        // Ensure that at least one field is provided for updating
        if (!name && !description) {
            return { error: "No fields provided to update." };
        }

        // Update the newsletter in the database
        const updatedNewsletter = await db.newsletter.update({
            where: {
                id: id,
            },
            data: {
                ...(name && { name }),
                ...(description && { description }),
            },
        });

        return { success: "Newsletter updated successfully.", data: updatedNewsletter };
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error updating newsletter:", error);

        // Return a more user-friendly error message
        return { error: "An error occurred while updating the newsletter." };
    }
}
