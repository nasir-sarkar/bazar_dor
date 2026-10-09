"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, InputGroup, Label, TextField } from "@heroui/react";



export default function PasswordField({ name = "password", label, placeholder, description, validate }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <TextField
            isRequired
            className="w-full"
            name={name}
            validate={validate}
        >
            <Label>{label}</Label>

            <InputGroup>
                <InputGroup.Input
                    className="w-full"
                    placeholder={placeholder}
                    type={isVisible ? "text" : "password"}
                />
                <InputGroup.Suffix className="pe-0">
                    <Button
                        isIconOnly
                        aria-label={isVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
                        size="sm"
                        variant="ghost"
                        onPress={() => setIsVisible(!isVisible)}
                    >
                        {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                    </Button>
                </InputGroup.Suffix>
            </InputGroup>
            {description && <Description>{description}</Description>}
            <FieldError />
        </TextField>
    );
}