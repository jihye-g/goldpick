"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/common/Button";
import { CheckboxField } from "@/components/common/Checkbox";
import { TextField } from "@/components/common/TextField";
import { commentSchema, type CommentFormValues } from "@/components/forms/schema/community";
import { isAxiosError } from "axios";
import { useCreateComment } from "@/hooks/comments";
import { useToast } from "@/hooks/common/useToast";

// Figma: CommentInputBar (3090:1895) — 비밀 토글(pt 12 · pb 8) + 입력·전송(pt 8 · pb 16, gap 8), shadow/sheet
export function CommentInputBar({ postId }: { postId: string }) {
  const toast = useToast();
  const { mutateAsync, isPending } = useCreateComment(postId);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "", isSecret: false },
  });

  const onSubmit = async (values: CommentFormValues) => {
    try {
      await mutateAsync(values);
      reset({ content: "", isSecret: values.isSecret });
    } catch (error) {
      toast.error(
        isAxiosError(error) && error.response?.status === 401
          ? "로그인 후 댓글을 남길 수 있어요."
          : "댓글을 등록하지 못했어요. 잠시 후 다시 시도해주세요."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sticky bottom-0 bg-bg-surface shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)]"
    >
      <Controller
        control={control}
        name="isSecret"
        render={({ field }) => (
          <CheckboxField
            label="비밀댓글로 달기"
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
            className="px-[16px] pt-[12px] pb-[8px]"
          />
        )}
      />
      <div className="flex items-start gap-[8px] px-[16px] pt-[8px] pb-[16px]">
        <TextField
          variant="filled"
          aria-label="댓글"
          placeholder="댓글을 입력해주세요"
          autoComplete="off"
          status={errors.content ? "error" : "default"}
          caption={errors.content?.message}
          {...register("content")}
        />
        <Button type="submit" size="M" disabled={isSubmitting || isPending} className="shrink-0 rounded-full">
          전송
        </Button>
      </div>
    </form>
  );
}
