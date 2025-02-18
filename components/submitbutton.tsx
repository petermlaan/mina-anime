"use client";

import React from "react";
import { useFormStatus } from "react-dom";

// Submitt button for forms that becomes disabled when form is submitted
export default function SubmitButton() {
    const { pending } = useFormStatus()
    return <button type="submit" disabled={pending} className={pending ? "disabled" : ""}>Logga in</button>
}
