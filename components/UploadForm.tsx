'use client';

import { useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const voices = {
  male: [
    {
      id: "dave",
      name: "Dave",
      description:
        "Young male, British-Essex, casual & conversational",
    },
    {
      id: "daniel",
      name: "Daniel",
      description:
        "Middle-aged male, British, authoritative but warm",
    },
    {
      id: "chris",
      name: "Chris",
      description:
        "Male, casual & easy-going",
    },
  ],

  female: [
    {
      id: "rachel",
      name: "Rachel",
      description:
        "Young female, American, calm & clear",
    },
    {
      id: "sarah",
      name: "Sarah",
      description:
        "Young female, American, soft & approachable",
    },
  ],
};

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  author: z.string().min(2, "Author name is required"),
  voice: z.string().min(1, "Please select a voice"),
});

type FormValues = z.infer<typeof formSchema>;

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl">
      <div className="bg-white px-6 py-4 rounded-2xl shadow-lg">
        <p className="font-semibold text-lg">
          Generating Book AI...
        </p>
      </div>
    </div>
  );
};

const BookUploadForm = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: "",
      author: "",
      voice: "rachel",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!pdfFile) {
      alert("Please upload a PDF file");
      return;
    }

    try {
      setLoading(true);

      console.log({
        ...values,
        pdfFile,
        coverImage,
      });

      await new Promise((resolve) =>
        setTimeout(resolve, 2500)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="new-book-wrapper relative">
      {loading && <LoadingOverlay />}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >

          {/* PDF Upload */}
          <div className="space-y-3">
            <label className="form-label">
              Book PDF File
            </label>

            {!pdfFile ? (
              <label className="upload-dropzone cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setPdfFile(file);
                    }
                  }}
                />

                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <Upload className="w-10 h-10 text-[#7B6A58]" />

                  <p className="font-medium text-lg">
                    Click to upload PDF
                  </p>

                  <p className="text-sm text-gray-500">
                    PDF file (max 50MB)
                  </p>
                </div>
              </label>
            ) : (
              <div className="upload-dropzone flex items-center justify-between px-5 py-4">
                <p className="truncate">
                  {pdfFile.name}
                </p>

                <button
                  type="button"
                  onClick={() => setPdfFile(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* COVER IMAGE */}
          <div className="space-y-3">
            <label className="form-label">
              Cover Image (Optional)
            </label>

            {!coverImage ? (
              <label className="upload-dropzone cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setCoverImage(file);
                    }
                  }}
                />

                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <ImageIcon className="w-10 h-10 text-[#7B6A58]" />

                  <p className="font-medium text-lg">
                    Click to upload cover image
                  </p>

                  <p className="text-sm text-gray-500">
                    Leave empty to auto-generate from PDF
                  </p>
                </div>
              </label>
            ) : (
              <div className="upload-dropzone flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={URL.createObjectURL(coverImage)}
                    alt="cover"
                    width={50}
                    height={50}
                    className="rounded-lg object-cover"
                  />

                  <p className="truncate">
                    {coverImage.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCoverImage(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Title
                </FormLabel>

                <FormControl>
                  <input
                    placeholder="ex: Rich Dad Poor Dad"
                    className="form-input"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* AUTHOR */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Author Name
                </FormLabel>

                <FormControl>
                  <input
                    placeholder="ex: Robert Kiyosaki"
                    className="form-input"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* VOICE SELECTOR */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Choose Assistant Voice
                </FormLabel>

                <div className="space-y-6">

                  {/* Male Voices */}
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      Male Voices
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      {voices.male.map((voice) => {
                        const isSelected =
                          field.value === voice.id;

                        return (
                          <button
                            type="button"
                            key={voice.id}
                            onClick={() =>
                              field.onChange(voice.id)
                            }
                            className={
                              isSelected
                                ? "voice-selector-option-selected"
                                : "voice-selector-option"
                            }
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-4 h-4 rounded-full border mt-1 flex items-center justify-center">
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-black" />
                                )}
                              </div>

                              <div className="text-left">
                                <h3 className="font-semibold">
                                  {voice.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                  {voice.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Female Voices */}
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      Female Voices
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {voices.female.map((voice) => {
                        const isSelected =
                          field.value === voice.id;

                        return (
                          <button
                            type="button"
                            key={voice.id}
                            onClick={() =>
                              field.onChange(voice.id)
                            }
                            className={
                              isSelected
                                ? "voice-selector-option-selected"
                                : "voice-selector-option"
                            }
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-4 h-4 rounded-full border mt-1 flex items-center justify-center">
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-black" />
                                )}
                              </div>

                              <div className="text-left">
                                <h3 className="font-semibold">
                                  {voice.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                  {voice.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            className="form-btn w-full bg-[#663820] text-white font-serif"
          >
            Begin Synthesis
          </button>
        </form>
      </Form>
    </section>
  );
};

export default BookUploadForm;