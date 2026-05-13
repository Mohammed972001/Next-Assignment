"use client";

import { useState } from "react";
import { PdpDetailsColumn } from "@/components/product/pdp/PdpDetailsColumn";
import { PdpMediaColumn } from "@/components/product/pdp/PdpMediaColumn";
import { PdpRelatedRecommendations } from "@/components/product/pdp/PdpRelatedRecommendations";
import { PdpTabsPanel } from "@/components/product/pdp/PdpTabsPanel";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ReviewModal } from "@/components/reviews/ReviewModal";
import { usePdpForm } from "@/hooks/usePdpForm";
import { useReviews } from "@/hooks/useReviews";

export function ProductExperience() {
  const form = usePdpForm();
  const { reviews, aggregate, createReview, updateReview, deleteReview } = useReviews();

  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("reviews");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewModalId, setReviewModalId] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const openReviewModal = (editId: string | null) => {
    setEditingId(editId);
    setReviewModalId((n) => n + 1);
    setReviewOpen(true);
  };

  const editingReview = editingId
    ? (reviews.find((r) => r.id === editingId) ?? null)
    : null;

  return (
    <article className="min-w-0 w-full max-w-full overflow-x-clip bg-white text-[#121212]">
      <div className="flex min-w-0 flex-col lg:flex-row lg:items-stretch">
        <PdpMediaColumn />
        <PdpDetailsColumn
          form={form}
          ratingAverage={aggregate.average}
          reviewCount={aggregate.count}
        />
      </div>

      <PdpTabsPanel
        activeTab={activeTab}
        onTabChange={setActiveTab}
        ratingAverage={aggregate.average}
        reviewCount={aggregate.count}
        reviews={reviews}
        onWriteReview={() => openReviewModal(null)}
        onEditReview={(id) => openReviewModal(id)}
        onDeleteReview={(id) => setDeleteTarget(id)}
      />

      <PdpRelatedRecommendations />

      <ReviewModal
        key={reviewModalId}
        open={reviewOpen}
        onClose={() => {
          setReviewOpen(false);
          setEditingId(null);
        }}
        mode={editingReview ? "edit" : "create"}
        initial={
          editingReview
            ? {
                rating: editingReview.rating,
                body: editingReview.body,
                hideName: editingReview.hideName,
              }
            : undefined
        }
        title={editingReview ? "Edit your review" : "Leave your review"}
        onSubmit={({ author, rating, body, hideName }) => {
          if (editingId) {
            updateReview(editingId, { rating, body, hideName });
            return;
          }
          createReview({ author, rating, body, hideName });
        }}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        message="Are you sure you want to delete this review?"
        onConfirm={() => {
          if (deleteTarget) deleteReview(deleteTarget);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </article>
  );
}
