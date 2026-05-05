"use server";

export async function submitContact(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const expertSlug = formData.get("expertSlug") as string;

    // TODO: In a production environment this would insert into Supabase 
    // or send an email using Resend to the expert's email.
    
    // Simulating delay for MVP
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log(`[Contact Form] Message from ${name} (${email}) to expert ${expertSlug}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    return {
        success: true,
        message: "Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.",
    };
}
